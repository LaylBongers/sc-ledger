<template>
<tr>
    <td><input type="text" class="form-control" v-model="workingChange.resource"></input></td>
    <td><input type="number" class="form-control" v-model="workingChange.buy"></input></td>
    <td><input type="number" class="form-control" v-model="workingChange.sell"></input></td>
    <td><button
        class="btn"
        style="width: 2.4em;"
        :class="{ 'btn-success': buttonEnabled, 'btn-secondary': !buttonEnabled }"
        :disabled="!buttonEnabled"
        @click="submitChange"
    >+</button></td>
</tr>
</template>

<script>
export default {
    name: 'add-price-log-change',
    data () {
        return {
            workingChange: this.createEmptyWorkingChange(),
        }
    },
    computed: {
        buttonEnabled () {
            let buySell = this.parseBuySell()
            return this.workingChange.resouce !== '' &&
                (buySell.buy !== null || buySell.sell !== null)
        },
    },
    methods: {
        submitChange () {
            // Convert to the format we need
            let change = this.workingChange
            let buySell = this.parseBuySell()
            change.buy = buySell.buy
            change.sell = buySell.sell

            // Raise the event, we're done with this
            this.$emit('submitted', change)

            this.reset()
        },
        createEmptyWorkingChange () {
            return {
                resource: '',
                buy: '',
                sell: '',
            }
        },
        reset () {
            this.workingChange = this.createEmptyWorkingChange()
        },
        parseBuySell () {
            let buy = parseFloat(this.workingChange.buy)
            let sell = parseFloat(this.workingChange.sell)

            if (isNaN(buy)) {
                buy = null
            }
            if (isNaN(sell)) {
                sell = null
            }

            return { buy, sell }
        },
    },
}
</script>

<style>
</style>

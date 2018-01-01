<template>
<tr>
    <td><input type="text" class="form-control" v-model="workingChange.resource"></input></td>
    <td><input type="number" class="form-control" v-model="workingChange.buy"></input></td>
    <td><input type="number" class="form-control" v-model="workingChange.sell"></input></td>
    <td><button class="btn btn-success" style="width: 2.4em;" @click="submitChange">+</button></td>
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
    methods: {
        submitChange () {
            // Convert to the format we need
            if (this.workingChange.buy === '') {
                this.workingChange.buy = null
            }
            if (this.workingChange.sell === '') {
                this.workingChange.sell = null
            }

            this.$emit('submitted', this.workingChange)

            this.workingChange = this.createEmptyWorkingChange()
        },
        createEmptyWorkingChange () {
            return {
                resource: '',
                buy: '',
                sell: '',
            }
        },
    },
}
</script>

<style>
</style>

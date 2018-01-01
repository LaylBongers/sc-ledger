<template>
<div>
    <div class="card bg-dark mt-3">
        <h3 class="card-header">New Price Log</h3>
        <div class="card-body">
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="form-control" v-model="priceLog.location"></input>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Resource</th>
                        <th scope="col">Buy</th>
                        <th scope="col">Sell</th>
                            <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(change, index) in priceLog.changes">
                        <td>{{ change.resource }}</td>
                        <td>{{ change.buy }}</td>
                        <td>{{ change.sell }}</td>
                        <td><button class="btn btn-danger" style="width: 2.4em;" @click="removeChange(index)">-</button></td>
                    </tr>
                    <tr>
                        <td><input type="text" class="form-control" v-model="workingChange.resource"></input></td>
                        <td><input type="number" class="form-control" v-model="workingChange.buy"></input></td>
                        <td><input type="number" class="form-control" v-model="workingChange.sell"></input></td>
                        <td><button class="btn btn-success" style="width: 2.4em;" @click="addChange">+</button></td>
                    </tr>
                </tbody>
            </table>

            <button type="submit" class="btn btn-primary" @click="submitPriceLog">Submit Price Log</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'add-price-log',
    data () {
        return {
            priceLog: this.createEmptyPriceLog(),
            workingChange: this.createEmptyWorkingChange(),
        }
    },
    methods: {
        submitPriceLog () {
            this.priceLog.timestamp = new Date()

            this.$emit('submitted', this.priceLog)

            this.priceLog = this.createEmptyPriceLog()
            this.workingChange = this.createEmptyWorkingChange()
        },
        addChange () {
            if (this.workingChange.buy === '') {
                this.workingChange.buy = null
            }
            if (this.workingChange.sell === '') {
                this.workingChange.sell = null
            }

            this.priceLog.changes.push(this.workingChange)

            this.workingChange = this.createEmptyWorkingChange()
        },
        removeChange (index) {
            this.priceLog.changes.splice(index, 1)
        },
        createEmptyPriceLog () {
            return {
                timestamp: null,
                location: '',
                changes: [
                    {
                        resource: 'Hydrogen',
                        buy: 0.8,
                        sell: null,
                    },
                ],
            }
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

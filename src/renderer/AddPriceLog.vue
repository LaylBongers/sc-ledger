<template>
<div class="col-12 col-md-6 mt-3">
    <div class="card bg-dark">
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
                    <AddPriceLogChange ref="addPlcForm" @submitted="addChange" />
                </tbody>
            </table>

            <button type="submit" class="btn btn-primary" @click="submitPriceLog">Submit Price Log</button>
        </div>
    </div>
</div>
</template>

<script>
import AddPriceLogChange from './AddPriceLogChange'

export default {
    name: 'add-price-log',
    components: {
        AddPriceLogChange
    },
    data () {
        return {
            priceLog: this.createEmptyPriceLog(),
        }
    },
    methods: {
        submitPriceLog () {
            this.priceLog.timestamp = new Date()

            this.$emit('submitted', this.priceLog)

            this.priceLog = this.createEmptyPriceLog()
            this.$refs.addPlcForm.reset()
        },
        addChange (change) {
            this.priceLog.changes.push(change)
        },
        removeChange (index) {
            this.priceLog.changes.splice(index, 1)
        },
        createEmptyPriceLog () {
            return {
                timestamp: null,
                location: '',
                changes: [],
            }
        },
    },
}
</script>

<style>
</style>

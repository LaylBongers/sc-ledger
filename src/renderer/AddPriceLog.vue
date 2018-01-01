<template>
<div>
    <div class="card bg-dark mt-3">
        <h3 class="card-header">New Price Log</h3>
        <div class="card-body">
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="form-control"></input>
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
                    <tr v-for="change in priceLog.changes">
                        <td>{{ change.resource }}</td>
                        <td>{{ change.buy }}</td>
                        <td>{{ change.sell }}</td>
                            <td><button class="btn btn-danger" style="width: 2.4em;">-</button></td>
                    </tr>
                    <tr>
                        <td><input type="text" class="form-control"></input></td>
                        <td><input type="text" class="form-control"></input></td>
                        <td><input type="text" class="form-control"></input></td>
                            <td><button class="btn btn-success" style="width: 2.4em;">+</button></td>
                    </tr>
                </tbody>
            </table>

            <button type="submit" class="btn btn-primary" v-on:click="submitPricelog">Submit Price Log</button>
            <p>{{ submittedText }}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'add-price-log',
    data () {
        return {
            priceLog: {
                timestamp: new Date(),
                location: 'Port Olisar',
                changes: [
                    {
                        resource: 'Hydrogen',
                        buy: 0.8,
                        sell: null,
                    },
                ],
            },
            submittedText: 'Not Submitted',
        }
    },
    methods: {
        submitPricelog () {
            this.submittedText = 'Submitted'
        }
    },
}
</script>

<style>
</style>

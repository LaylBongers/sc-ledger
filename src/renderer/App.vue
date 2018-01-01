<template>
<div id="app">
    <div class="container-fluid text-light">
        <div class="row">
            <AddPriceLog @submitted="priceLogSubmitted" />

            <div class="col-12 col-md-6 mt-3"><h2>Lorem Ipsum</h2></div>

            <div class="col-12">
                <h2 class="mt-3">Price Logs</h2>
                <div v-for="log in displayedPriceLogs">
                    <h3>{{ log.location }} at {{ log.timestamp.toUTCString() }}</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Buy</th>
                                <th>Sell</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="change in log.changes">
                                <td>{{ change.resource }}</td>
                                <td>{{ change.buy }}</td>
                                <td>{{ change.sell }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import AddPriceLog from './AddPriceLog'

export default {
    name: 'sc-ledger',
    components: {
        AddPriceLog
    },
    computed: {
        displayedPriceLogs () {
            return this.priceLogs.slice().reverse()
        }
    },
    data () {
        return {
            priceLogs: [
                {
                    timestamp: new Date(),
                    location: 'Port Olisar',
                    changes: [
                        {
                            resource: 'Hydrogen',
                            buy: 0.8,
                            sell: null,
                        },
                    ],
                }, {
                    timestamp: new Date(),
                    location: 'Grim HEX',
                    changes: [
                        {
                            resource: 'Hydrogen',
                            buy: null,
                            sell: 1.0,
                        },
                    ],
                }
            ],
        }
    },
    methods: {
        priceLogSubmitted (priceLog) {
            this.priceLogs.push(priceLog)
        }
    }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

body {
    background-color: #202024;
}

</style>

<template>
<div id="app">
    <div class="container-fluid text-light">
        <AddPriceLog />

        <h2 class="mt-3">Price Logs</h2>
        <div v-for="log in priceLogs">
            <h3>{{ log.location }} at {{ log.timestamp.toUTCString() }}</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Resource</th>
                        <th scope="col">Buy</th>
                        <th scope="col">Sell</th>
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
</template>

<script>
import AddPriceLog from './AddPriceLog'

export default {
    name: 'sc-ledger',
    components: {
        AddPriceLog
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
                }
            ],
        }
    },
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

body {
    background-color: #202024;
}

</style>

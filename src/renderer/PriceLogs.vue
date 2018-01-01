<template>
<div>
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
</template>

<script>
export default {
    name: 'price-logs',
    props: ['priceLogs'],
    computed: {
        displayedPriceLogs () {
            return this.priceLogs.slice().reverse()
        }
    },
}
</script>

<style>
</style>

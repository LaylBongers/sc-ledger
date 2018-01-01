<template>
<div class="card bg-dark">
    <h3 class="card-header">View Location</h3>
    <div class="card-body">
        <select class="form-control" v-model="selectedLocationKey">
            <option v-for="(location, name) in locations" :value="name">
                {{ name }}
            </option>
        </select>
        <div class="mt-3" v-if="selectedLocation != null">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">When</th>
                        <th scope="col">Resource</th>
                        <th scope="col">Buy</th>
                        <th scope="col">Sell</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="priceChange in selectedLocation.priceChanges">
                        <td><timeago :since="priceChange.timestamp" /></td>
                        <td>{{ priceChange.resource }}</td>
                        <td>{{ priceChange.buy }}</td>
                        <td>{{ priceChange.sell }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'search-routes',
    props: ['locations'],
    computed: {
        selectedLocation () {
            if (this.selectedLocationKey === null) {
                return null
            }

            return this.locations[this.selectedLocationKey]
        },
    },
    data () {
        return {
            selectedLocationKey: null,
        }
    }
}
</script>

<style>
</style>

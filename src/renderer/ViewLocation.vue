<template>
<div class="card bg-dark">
    <h3 class="card-header">View Location</h3>
    <div class="card-body">
        <select class="form-control" v-model="selectedLocationKey" @change="clearConfirms">
            <option v-for="(location, name) in locations" :value="name" :key="name">
                {{ name }}
            </option>
        </select>
        <div class="mt-3" v-if="selectedLocation != null">
            <h4>Prices</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Resource</th>
                        <th scope="col">Buy</th>
                        <th scope="col">Sell</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(prices, key) in selectedLocation.currentPrices">
                        <td>{{ key }}</td>
                        <td><span v-if="prices.buy != null">{{ prices.buy.toFixed(2) }}</span></td>
                        <td><span v-if="prices.sell != null">{{ prices.sell.toFixed(2) }}</span></td>
                    </tr>
                </tbody>
            </table>

            <h4>Price Changes</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">When</th>
                        <th scope="col">Resource</th>
                        <th scope="col">Buy</th>
                        <th scope="col">Sell</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(change, index) in selectedLocation.priceChanges">
                        <td><timeago :since="change.timestamp" /></td>
                        <td>{{ change.resource }}</td>
                        <td><span v-if="change.buy != null">{{ change.buy.toFixed(2) }}</span></td>
                        <td><span v-if="change.sell != null">{{ change.sell.toFixed(2) }}</span></td>
                        <td><button class="btn btn-danger btn-sm" @click="priceRemoved(index)">-</button></td>
                    </tr>
                </tbody>
            </table>

            <div class="row">
                <div class="col">
                    <button
                        class="btn btn-danger btn-sm"
                        style="width: 100%"
                        v-if="!clearConfirm"
                        @click="clearConfirm = true"
                    >Clear Prices</button>
                    <button
                        class="btn btn-danger btn-sm"
                        style="width: 100%"
                        v-else
                        @click="clearCurrent"
                    >Are you sure?</button>
                </div>
                <div class="col">
                    <button
                        class="btn btn-danger btn-sm"
                        style="width: 100%"
                        v-if="!deleteConfirm"
                        @click="deleteConfirm = true"
                    >Delete Location</button>
                    <button
                        class="btn btn-danger btn-sm"
                        style="width: 100%"
                        v-else
                        @click="deleteCurrent"
                    >Are you sure?</button>
                </div>
            </div>
        </div>
        <hr />
        <h4>Create New Location</h4>
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="createLocationName" />
        </div>
        <button class="btn btn-primary" @click="createLocation">Create</button>
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
            clearConfirm: false,
            deleteConfirm: false,
            createLocationName: null,
        }
    },
    methods: {
        clearConfirms () {
            this.clearConfirm = false
            this.deleteConfirm = false
        },
        clearCurrent () {
            // Remove all the price data
            this.selectedLocation.currentPrices = {}
            this.selectedLocation.priceChanges = []

            this.clearConfirms()
            this.$emit('data-updated')
        },
        deleteCurrent () {
            // Perform the deletion
            delete this.locations[this.selectedLocationKey]

            this.selectedLocationKey = null
            this.clearConfirms()
            this.$emit('data-updated')
        },
        priceRemoved (index) {
            this.$emit('price-removed', this.selectedLocation, index)
        },
        createLocation () {
            if (this.createLocationName === null || this.createLocationName === '') {
                return
            }

            if (this.createLocationName in this.locations) {
                this.createLocationName = null
                return
            }

            // Raise the event that this happened
            this.$emit('create-location', this.createLocationName)
            this.createLocationName = null
        },
    },
}
</script>

<style>
</style>

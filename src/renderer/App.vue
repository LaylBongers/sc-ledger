<template>
<div id="app">
    <div class="container-fluid text-light">
        <div class="row">
            <div class="col-12 col-md-6">
                <SearchRoutes class="mt-3" :locations="locations" />
            </div>

            <div class="col-12 col-md-6">
                <LogPrice
                    class="mt-3"
                    :locations="locations" :resources="resources"
                    @submitted="priceLogged"
                />
                <ViewLocation class="mt-3 mb-3" :locations="locations" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Store from './Store'

import LogPrice from './LogPrice'
import SearchRoutes from './SearchRoutes'
import ViewLocation from './ViewLocation'

let store = new Store()

export default {
    name: 'sc-ledger',
    components: {
        LogPrice,
        SearchRoutes,
        ViewLocation,
    },
    data () {
        return {
            locations: {
                'Port Olisar': {
                    currentPrices: {
                        'Hydrogen': { buy: 0.8, sell: null }
                    },
                    priceChanges: [
                        {
                            timestamp: new Date(),
                            resource: 'Hydrogen',
                            buy: 0.8,
                            sell: null,
                        },
                    ],
                },
                'Grim HEX': {
                    currentPrices: {
                        'Hydrogen': { buy: null, sell: 1.0 }
                    },
                    priceChanges: [
                        {
                            timestamp: new Date(),
                            resource: 'Hydrogen',
                            buy: null,
                            sell: 1.0,
                        },
                    ],
                },
            },
            resources: ['Hydrogen', 'Iodine'],
        }
    },
    created () {
        let me = this

        // Load in the data from the store
        store.load(function (err, data) {
            if (err) {
                return
            }

            me.locations = data
        })
    },
    methods: {
        priceLogged (location, priceChange) {
            // Add the change and sort the list of price changes
            location.priceChanges.push(priceChange)
            location.priceChanges.sort(function (a, b) {
                return new Date(b.timestamp) - new Date(a.timestamp)
            })

            // Now go through the list of changes in reverse and update the
            // latest price data, so it's easily accessable
            for (var i = location.priceChanges.length - 1; i >= 0; i--) {
                let change = location.priceChanges[i]

                // If there's no entry for this resource yet, add it
                if (!(change.resource in location.currentPrices)) {
                    location.currentPrices[change.resource] = {
                        buy: null,
                        sell: null,
                    }
                }

                // Update the prices that have changed
                if (change.buy !== null) {
                    location.currentPrices[change.resource].buy = change.buy
                }
                if (change.sell !== null) {
                    location.currentPrices[change.resource].sell = change.sell
                }
            }

            // Save the data
            store.save(this.locations)
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

<template>
<div class="card bg-dark">
    <h3 class="card-header">Search Routes</h3>
    <div class="card-body">
        <button class="btn btn-primary" @click="search">Search Best Route</button>
        <div class="mt-3" v-if="foundRoutes != null">
            <h4 v-if="foundRoutes.length == 1">Found Route</h4>
            <h4 v-else>Found Routes</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Resource</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="route in foundRoutes">
                        <td>{{ route.resource }}</td>
                        <td>
                            <span class="font-italic">{{ route.buyLocation }}</span>
                            <br />for {{ route.buyPrice.toFixed(2) }}
                        </td>
                        <td>
                            <span class="font-italic">{{ route.sellLocation }}</span>
                            <br />for {{ route.sellPrice.toFixed(2) }}
                        </td>
                        <td>{{ route.earnRatio.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-3" v-if="failed">
            <h4>Failed to Find a Route</h4>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'search-routes',
    props: ['locations'],
    data () {
        return {
            foundRoutes: null,
            failed: false,
        }
    },
    methods: {
        search () {
            this.failed = false

            let bestRoutes = []

            // Iterate over all the locations and their resources
            for (let buyLocationKey in this.locations) {
                let buyLocation = this.locations[buyLocationKey]
                for (let buyResource in buyLocation.currentPrices) {
                    let buyPrice = buyLocation.currentPrices[buyResource].buy

                    // If the buy price here is null we can't start here
                    if (buyPrice === null) {
                        continue
                    }

                    // We've now got a location to check that we start at
                    // Find all the places we can sell this at as well
                    for (let sellLocationKey in this.locations) {
                        let sellLocation = this.locations[sellLocationKey]
                        for (let sellResource in sellLocation.currentPrices) {
                            let sellPrice = sellLocation.currentPrices[sellResource].sell

                            // If the sell price here is null we can't end here
                            if (sellPrice === null) {
                                continue
                            }

                            // Of course it needs to be the same resource
                            if (buyResource !== sellResource) {
                                continue
                            }

                            // This earn ratio is what we use to be determine
                            // how good this route is
                            let earnRatio = sellPrice / buyPrice
                            if (earnRatio <= 1.0) {
                                // 1.0 or less doesn't give us anything
                                continue
                            }

                            let newRoute = {
                                resource: buyResource,
                                buyLocation: buyLocationKey,
                                buyPrice: buyPrice,
                                sellLocation: sellLocationKey,
                                sellPrice: sellPrice,
                                earnRatio: earnRatio,
                            }

                            // Now that we've got a buy-sell combo, we need to
                            // see where it fits in in the list, start by seeing
                            // if we just have free slots
                            if (bestRoutes.length < 10) {
                                bestRoutes.push(newRoute)
                                bestRoutes.sort(function (a, b) {
                                    return b.earnRatio - a.earnRatio
                                })
                                continue
                            }

                            // We don't have empty slots, see if the lowest slot
                            // is worse than what we have, if so replace it
                            if (bestRoutes[9].earnRatio < newRoute.earnRatio) {
                                bestRoutes[9] = newRoute
                                bestRoutes.sort(function (a, b) {
                                    return b.earnRatio - a.earnRatio
                                })
                            }
                        }
                    }
                }
            }

            // Now that we're done, store what we found
            if (bestRoutes.length !== 0) {
                this.foundRoutes = bestRoutes
            } else {
                this.failed = true
            }
        }
    },
}
</script>

<style>
</style>

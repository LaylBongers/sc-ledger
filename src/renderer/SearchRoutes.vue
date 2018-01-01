<template>
<div class="card bg-dark">
    <h3 class="card-header">Search Routes</h3>
    <div class="card-body">
        <button class="btn btn-primary" @click="search">Search Best Route</button>
        <div class="mt-3" v-if="foundRoute != null">
            <h4>Found Route</h4>
            <p>Haul
                <span class="font-weight-bold">{{ foundRoute.resource }}</span>
                from
                <span class="font-weight-bold">{{ foundRoute.buyLocation }}</span>
                to
                <span class="font-weight-bold">{{ foundRoute.sellLocation }}</span>
                with an earing ratio of
                <span class="font-weight-bold">{{ foundRoute.earnRatio }}.</span>
            </p>
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
            foundRoute: null,
            failed: false,
        }
    },
    methods: {
        search () {
            this.failed = false

            let bestBuyLocationKey = null
            let bestSellLocationKey = null
            let bestResource = null
            // Earn ratio starts at 1.0 because we don't want to lose money
            let bestEarnRatio = 1.0

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

                            // Now that we've got a buy-sell combo, check if
                            // it's a better one than what we have
                            let earnRatio = sellPrice / buyPrice
                            if (earnRatio > bestEarnRatio) {
                                // We've got something better, track it
                                bestBuyLocationKey = buyLocationKey
                                bestSellLocationKey = sellLocationKey
                                bestResource = buyResource
                                bestEarnRatio = earnRatio
                            }
                        }
                    }
                }
            }

            // Now that we're done, store what we found
            if (bestResource !== null) {
                this.foundRoute = {
                    buyLocation: bestBuyLocationKey,
                    sellLocation: bestSellLocationKey,
                    resource: bestResource,
                    earnRatio: bestEarnRatio.toFixed(2),
                }
            } else {
                this.failed = true
            }
        }
    },
}
</script>

<style>
</style>

<template>
<div class="card bg-dark">
    <h3 class="card-header">Log Price</h3>
    <div class="card-body">
        <div class="form-group">
            <label>Location</label>
            <select class="form-control" v-model="selectedLocationKey">
                <option v-for="(location, name) in locations" :value="name" :key="name">
                    {{ name }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>Resource</label>
            <select class="form-control" v-model="workingChange.resource">
                <option v-for="resource in resources" :value="resource" :key="resource">
                    {{ resource }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>Buy Price</label>
            <div class="form-row">
                <div class="col">
                    <label>Amount</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model="workingChange.buyAmount"
                    ></input>
                </div>
                <div class="col">
                    <label>For</label>
                    <div class="input-group">
                        <input
                            type="number"
                            class="form-control"
                            v-model="workingChange.buyFor"
                        ></input>
                        <div class="input-group-append">
                            <div class="input-group-text">UEC</div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="font-italic" v-if="buyPrice != null">Total: {{ buyPrice.toFixed(2) }} UEC/Unit</p>
            <p class="font-italic" v-else>Total: N/A</p>
        </div>
        <div class="form-group">
            <label>Sell Price</label>
            <div class="form-row">
                <div class="col">
                    <label>Amount</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model="workingChange.sellAmount"
                    ></input>
                </div>
                <div class="col">
                    <label>For</label>
                    <div class="input-group">
                        <input
                            type="number"
                            class="form-control"
                            v-model="workingChange.sellFor"
                        ></input>
                        <div class="input-group-append">
                            <div class="input-group-text">UEC</div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="font-italic" v-if="sellPrice != null">Total: {{ sellPrice.toFixed(2) }} UEC/Unit</p>
            <p class="font-italic" v-else>Total: N/A</p>
        </div>

        <button type="submit" class="btn btn-primary" @click="submitPriceLog">Submit Price</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'log-price',
    props: ['locations', 'resources'],
    data () {
        return {
            selectedLocationKey: null,
            workingChange: this.createEmptyChange(),
        }
    },
    computed: {
        buyPrice () {
            let buySell = this.calculateBuySell()
            return buySell.buy
        },
        sellPrice () {
            let buySell = this.calculateBuySell()
            return buySell.sell
        },
    },
    methods: {
        submitPriceLog () {
            // Get the buy and sell data
            let buySell = this.calculateBuySell()

            // Make sure we've got any data to add
            if (buySell.buy === null && buySell.sell === null) {
                return
            }

            // Find the location we need to add to
            if (this.selectedLocationKey === null) {
                return
            }
            let location = this.locations[this.selectedLocationKey]

            // Put together the final finished price change
            let priceChange = {
                timestamp: new Date(),
                resource: this.workingChange.resource,
                buy: buySell.buy,
                sell: buySell.sell,
            }

            // Send the finished price change to the parent
            this.$emit('submitted', location, priceChange)

            this.workingChange = this.createEmptyChange()
        },
        createEmptyChange () {
            return {
                resource: '',
                buyAmount: null,
                buyFor: null,
                sellAmount: null,
                sellFor: null,
            }
        },
        calculateBuySell () {
            let buyAmount = parseFloat(this.workingChange.buyAmount)
            let buyFor = parseFloat(this.workingChange.buyFor)
            let sellAmount = parseFloat(this.workingChange.sellAmount)
            let sellFor = parseFloat(this.workingChange.sellFor)

            let buy = null
            if (!isNaN(buyAmount) && !isNaN(buyFor)) {
                buy = buyFor / buyAmount
            }
            let sell = null
            if (!isNaN(sellAmount) && !isNaN(sellFor)) {
                sell = sellFor / sellAmount
            }

            return { buy, sell }
        },
    },
}
</script>

<style>
</style>

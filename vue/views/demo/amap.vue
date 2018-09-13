<template>
    <div class="container">
        <p class="ptb10">1、地图</p>
        <el-amap vid="amapDemo1" :zoom="zoom" :center="center" class="amap-demo"></el-amap>
        <p class="ptb10">2、点坐标</p>
        <el-amap vid="amapDemo2" :zoom="zoom" :center="center" class="amap-demo">
            <el-amap-marker v-for="marker in markers" :position="marker.position" :key="marker.position"></el-amap-marker>
        </el-amap>
        <p class="ptb10">3、多边形</p>
        <el-amap vid="amapDemo3" :zoom="zoom" :center="center3" class="amap-demo">
            <el-amap-polygon v-for="(polygon, index) in polygons" :vid="index" :key="index" :ref="`polygon_${index}`" :path="polygon.path" :events="polygon.events"></el-amap-polygon>
        </el-amap>
        <p class="pt10">4、搜索</p>
        <div class="amap-page-container">
            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap vid="amapDemo4" :zoom="zoom" :center="center4" class="amap-demo">
                <el-amap-marker v-for="marker in markers4" :position="marker" :key="marker.position"></el-amap-marker>
            </el-amap>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                zoom: 12,
                center: [121.59996, 31.197646],
                center3: [121.5273285, 31.21515044],
                markers: [
                    {
                        position: [121.5273285, 31.21515044],
                        events: {
                            click: () => {
                                alert('click marker');
                            },
                            dragend: (e) => {
                                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false
                    }
                ],
                polygons: [
                    {
                        path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
                        events: {
                            click: () => {
                                alert('click polygon');
                                console.log(amapManager.getComponent(0));
                                console.log(this.$refs.map.$$getCenter())
                                console.log(this.$refs.polygon_0[0].$$getPath())
                            }
                        }
                    }
                ],
                markers4: [
                    [121.59996, 31.197646],
                    [121.40018, 31.197622],
                    [121.69991, 31.207649]
                ],
                searchOption: {
                    city: '上海',
                    citylimit: true
                },
                center4: [121.59996, 31.197646],
            };
        },
        methods: {
            addMarker: function() {
                let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
                let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
                this.markers.push([lng, lat]);
            },
            onSearchResult(pois) {
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        let {lng, lat} = poi;
                        lngSum += lng;
                        latSum += lat;
                        this.markers4.push([poi.lng, poi.lat]);
                    });
                    let center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    };
                    this.center4 = [center.lng, center.lat];
                }
            }
        }
    };
</script>

<style lang="scss"  scoped>
    .amap-demo {
        width: 800px;
        height: 500px;
    }
    .search-box {
        position: absolute;
        top: 25px;
        left: 20px;
    }
    .amap-page-container {
        position: relative;
    }
</style>
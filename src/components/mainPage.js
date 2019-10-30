import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity, FlatList, TextInput, SafeAreaView, Platform, Alert, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get("window");


import _ from 'lodash';

export default class mainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false, dataSource: null, refreshing_: false, sehirKodu: "", listFlex: 1, animation: new Animated.Value(1) }
    }

    SearchCities() {
        if (this.state.sehirKodu == "" || this.state.sehirKodu < 1 || this.state.sehirKodu > 81 || isNaN(this.state.sehirKodu)) {
            Alert.alert(
                'Hatalı Giriş',
                '1-81 arası şehir kodunu girin.',
                [
                    { text: 'Tamam', onPress: () => console.log('Tamam') },
                ],
                { cancelable: false },
            );
        }
        else {


            this.setState({
                isLoading: false
            })
            fetch('https://digikent.basaksehir.bel.tr:8091/VadiRestMobile/login/belediyeler/' + this.state.sehirKodu + '', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({
                        dataSource: responseJson
                    })
                });

            //this.setState({ listFlex: 5 })
            Animated.timing(this.state.animation, {
                toValue: 5,
                duration: 1000
            }).start()
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <Image
                            style={{ width: 75, height: 75 }}
                            source={{ uri: 'https://image.flaticon.com/icons/png/512/36/36345.png' }}
                        />
                        <Text style={{ color: "white", fontSize: 20 }}>BELEDİYELER</Text>

                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <TextInput placeholder="Şehir kodu girin." onChangeText={text => this.setState({ sehirKodu: text })} style={{ borderBottomWidth: 1, width: width * 0.3, textAlign: "center", color: "white", borderColor: "white" }}></TextInput>
                        <TouchableOpacity onPress={() => this.SearchCities()}>
                            <View style={{ width: width * 0.1, height: 30, backgroundColor: "#E8E8E8", alignItems: "center", justifyContent: "center", borderRadius: 15 }}>
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={{ uri: 'https://img.icons8.com/pastel-glyph/2x/search--v2.png' }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={{ flex: this.state.animation, justifyContent: "center", alignItems: "center", width: width }}>
                        {_.isNull(this.state.dataSource) ? null :
                            <FlatList
                                style={{ flex: 8 }}
                                showsVerticalScrollIndicator={false}
                                data={this.state.dataSource}
                                refreshing={this.state.refreshing_}
                                renderItem={(info) =>
                                    <TouchableOpacity onPress={() => Actions.detail({ Text: info.item.id })} style={{ height: 40, width: width * 0.7, marginTop: 5 }}>
                                        <View style={styles.bodyCards}>
                                            <View style={{ flex: 1, marginLeft: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={{ fontWeight: "bold", flex: 5 }}>
                                                    {info.item.tanim}
                                                </Text>
                                                <Text style={{ fontWeight: "bold", flex: 1 }}>
                                                    >
                                            </Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>}
                                keyExtractor={(id, index) => index.toString()}
                            />

                        }


                    </Animated.View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    firstStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height, height,
        backgroundColor: "#024B8B"
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: "#024B8B",
        marginTop: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: "#024B8B",
        flexDirection: "row",
        marginBottom: 4
    },
    body: {
        flex: 8,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyCards: {
        width: width * 0.7,
        height: 40,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: "#E8E8E8",
        borderRadius: 20
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: "#878787",
    },
});
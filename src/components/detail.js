import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, TextInput, Platform, SafeAreaView, Image } from 'react-native';
import _ from 'lodash';

const { width, height } = Dimensions.get("window");

export default class detail extends Component {


    constructor(props) {
        super(props);
        this.state = { isLoading: false, dataSource: null, refreshing_: false, mahalleAdi: "", filtredDatasource: null, control: false }
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
        fetch('https://digikent.basaksehir.bel.tr:8091/VadiRestMobile/login/mahalle/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                belediyeId: this.props.Text,
                userId: '1',
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    dataSource: responseJson
                })
            });
    }

    onChangeTextHandler = (text) => {
        var textUpper = text.toUpperCase();
        this.setState({ mahalleAdi: text})
        console.log(this.state.mahalleAdi)

        var filtredDatasource = this.state.dataSource.filter(mahalle => {

            return mahalle.tanim.includes(textUpper)

        })
        this.setState({ control: true })
        this.setState({ filtredDatasource: filtredDatasource })


    }

    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                <View style={{ flex: 1, alignItems: "center", justifyContent:"center", flexDirection: "row", marginBottom: 10 }}>
                    <TextInput placeholder="Mahalle Ara" onChangeText={this.onChangeTextHandler} value={this.state.mahalleAdi} style={{ borderBottomWidth: 1, width: width * 0.3, textAlign: "center", color: "white", borderColor: "white" }}></TextInput>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={{ uri: 'https://img.icons8.com/pastel-glyph/2x/search--v2.png' }}
                    />
                </View>
                <View style={{ flex: 5, justifyContent: "center", alignItems: "center", width: width }}>
                    {_.isNull(this.state.dataSource) ? null :
                        <FlatList
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            data={this.state.control ? this.state.filtredDatasource : this.state.dataSource}
                            refreshing={this.state.refreshing_}
                            renderItem={(info) => {
                                return (
                                    <View style={styles.bodyCards}>
                                        <View style={{ marginRight: 10, marginLeft: 10 }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {info.item.tanim}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }

                            }
                            keyExtractor={(id, index) => index.toString()}
                        />

                    }

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: "#878787",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height, height
    },
    body: {
        flex: 3,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyCards: {
        width: width * 0.7,
        height: 40,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 5,
        backgroundColor: "#E8E8E8",
        borderRadius: 20
    },
});
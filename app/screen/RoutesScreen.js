import React from 'react'
import {Image} from 'react-native'
import {Container, Content, Card, CardItem, View, SwipeRow, Thumbnail, Text, Button, Icon, Left, Body, Right} from "native-base";
import {Avatar} from "react-native-elements";
export default class RoutesScreen extends React.Component{
    render(){
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Avatar rounded title={"MR"} size="large"
                     onPress={() => console.log("Profile on route pressed")}
                     activeOpacity={0.7}/>
                                <Body>
                                <Text>Route Name</Text>
                                <Text note>User</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'https://tnuqq21kt870t8n1egkbrmbr-wpengine.netdna-ssl.com/wp-content/uploads/2015/09/Stairs-RE_SIZED_Tommy-Battistelli.jpg'}} style={{height: 200, width: null, flex:1}}/>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Route description goes here... Route description goes here...
                                Route description goes here...
                                Route description goes here...
                                Route description goes here...
                                Route description goes here...
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <SwipeRow
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        left={<Button success onPress={() => alert('Added to map')}>
                            <Icon active name={"add"}/>
                        </Button>
                        }
                        body={
                            <View>
                                <Text> Swipe Left to Add, Right to Delete Route</Text>
                            </View>
                        }
                        right={
                            <Button danger onPress={() => alert("Deleted route")}>
                                <Icon active name={"trash"}/>
                            </Button>
                        }
                        >

                    </SwipeRow>
                    <Card>
                        <CardItem>
                            <Left>
                                <Avatar rounded title={"MR"} size="large"
                     onPress={() => console.log("Profile on route pressed")}
                     activeOpacity={0.7}/>
                                <Body>
                                <Text>Route Name</Text>
                                <Text note>User</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'https://tnuqq21kt870t8n1egkbrmbr-wpengine.netdna-ssl.com/wp-content/uploads/2015/09/Stairs-RE_SIZED_Tommy-Battistelli.jpg'}} style={{height: 200, width: null, flex:1}}/>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                Route description goes here... Route description goes here...
                                Route description goes here...
                                Route description goes here...
                                Route description goes here...
                                Route description goes here...
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <SwipeRow
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        left={<Button success onPress={() => alert('Added to map')}>
                            <Icon active name={"add"}/>
                        </Button>
                        }
                        body={
                            <View>
                                <Text> Swipe Left to Add, Right to Delete Route</Text>
                            </View>
                        }
                        right={
                            <Button danger onPress={() => alert("Deleted route")}>
                                <Icon active name={"trash"}/>
                            </Button>
                        }
                        >

                    </SwipeRow>
                </Content>
            </Container>
        )
    }
}

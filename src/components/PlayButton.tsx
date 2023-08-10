import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f44336',
    }
});

interface IProps {
    setModalVisible: (visible: boolean) => void;
}

class PlayButton extends React.PureComponent<IProps> {

    render() {
        const {setModalVisible} = this.props;
        return (
            <Pressable
                style={styles.button} 
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Icon name={'caret-forward-circle-outline'} 
                    size={30} 
                    color={'white'}
                    />
            </Pressable>
        )
    }
}

export default PlayButton;
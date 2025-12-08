import React from 'react';
import { View } from 'react-native';

interface Props {
    value: number;
}

export const ProgressBar: React.FC<Props> = ({ value }) => {
    return (
        <>
            <View className="h-3 bg-light-400 w-auto rounded-full mt-6">
                <View className={`h-3 bg-secondary rounded-full`} style={{ width: value }}>
                </View>
            </View>


        </>
    )
};

export default ProgressBar;
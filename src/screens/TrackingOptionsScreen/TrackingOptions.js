import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Realm from 'realm';
import HealthTrackingCategorySchema from '../../models/HealthTrackingCategorySchema';
import HealthTrackingOptionSchema from '../../models/HealthTrackingOptionSchema'

export default function TrackingOptions() {
    const [categories, setCategories] = useState();
    useEffect(() => {
        Realm.open({
            schema: [HealthTrackingCategorySchema, HealthTrackingOptionSchema]
        }).then(realm => {
            setCategories(realm.objects(HealthTrackingCategorySchema));
        });
    })
    return (
        <View>
            {/* {categories.map(c => {
                return (
                    <Text>{c.title}</Text>
                )
            })} */}
        </View>
    );
}



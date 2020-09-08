import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import base64 from 'react-native-base64';
import CategoryList from '../../components/CategoryList';

const authCode = base64.encode('m.vosooghian:m.vosooghian');

const Category = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [contentId, setContentId] = useState([]);
  const [image, setImage] = useState([]);
  const { navigation } = props;
  useEffect(() => {
    const getCategoryList = () => {
      axios({
        method: 'get',
        url: `https://ketab.partobanoo.com/rest/api/search?os_authType=basic&cql=(space.key=appcontent and type=page and label= "دسته‌بندی")`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      })
        .then((res) => {
          console.log(res);
          console.log(res.data.results);
          // console.log('splice', res.data.results.splice(0, 1));
          setCategoryList(res.data.results);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getCategoryList();
  }, []);

  // useEffect(() => {
  //   const getImage = () => {
  //     axios({
  //       method: 'get',
  //       //url: `https://jsonplaceholder.ir/users`,
  //       //url:'https://ketab.partobanoo.com/rest/api/content/?expand=body.view&depth=all/search?os_authType=basic&cql=(space.key=12345 and type=page and title="قاعدگی")',
  //       // url:  'https://ketab.partobanoo.com/rest/api/search?os_authType=basic&cql=(space.key=12345 and type=page and label="مقاله"  ) order by created desc&start=' +
  //       // 0 +
  //       // "&limit=" +
  //       // 6,
  //       // url:'https://ketab.partobanoo.com/rest/api/content/?expand=body.view&depth=all',
  //      // url: 'https://ketab.partobanoo.com/rest/api/content/3867138/child',
  //      url: `https://ketab.partobanoo.com/rest/api/content/${contentId}/child/attachment`,

  //       headers: {
  //         Authorization: 'Basic ' + authCode,
  //           'Content-Type': 'application/json',
  //           "cache-control": "no-cache",
  //         'X-Atlassian-Token': 'no-check',
  //       },

  //       // headers: {
  //       //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //       // },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         var allUrls = [];
  //         const data=res.data.results;
  //         //setImage(res.data.results);
  //         const imgUrl=[];
  //         for (let i = 0; i < data.length; i++) {
  //          imgUrl.push (`https://ketab.partobanoo.com${data[i]._links.download.split("?")[0]}?os_authType=basic`)

  //           // var res2 =  fetch(imgUrl + "?os_authType=basic", options);
  //           // var data2 =  res2.blob();
  //           //  allUrls.push({
  //           //   title: data.results[i].title,
  //           //   url: URL.createObjectURL(data2),
  //           // });
  //            console.log('imgUrl' ,imgUrl)
  //            setImage(imgUrl[0])

  //             //url: `https://ketab.partobanoo.com${imgUrl}?os_authType=basic`,

  //         }
  //         setImage(imgUrl[0])
  //        // setIsLoading(false)
  //         console.log('imgUrl' ,imgUrl)
  //         //console.log('image', res.data._expandable.attachment);
  //         // console.log('body',res.data.body.storage.value);
  //         // setArticle(res.data.body.storage.value);
  //       })
  //       .catch((err) => {
  //         console.error(err, err.response);
  //         // if (err.response && err.response.data) {
  //         //   setServerError(err.response.data.message)
  //         // }
  //       });
  //   };

  //   getImage();
  // }, [contentId]);

  return (
    <>
      <SafeAreaView>
        <FlatList
          style={{ paddingVertical: 15 }}
          data={categoryList}
          renderItem={({ item }) => (
            <CategoryList
              navigation={navigation}
              catId={item.content.id}
              buttonTitle="مشاهده همه"
              category={item.title}
              MoreBtnOnPress={() => {
                props.navigation.navigate('ArticlesList', {
                  catId: item.content.id,
                });
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </>
  );
};

export default Category;

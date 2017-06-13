import request from 'superagent';


const getJson = url => {
  return request
    .get(url)
    .set('Accept', 'application/json')
    .then(res => res.body);
};

export const getHnStoryIds = storyType => getJson(`https://hacker-news.firebaseio.com/v0/${storyType}stories.json`);

export const getHnItem = id => getJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
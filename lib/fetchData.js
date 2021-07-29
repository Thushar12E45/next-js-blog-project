export async function getPostsData() {
  const data = await fetch('https://mixd-blog.herokuapp.com/api/posts');
  const postsData = await data.json();
  return postsData;
}

export async function getAllArticlesId() {
  const data = await fetch('https://mixd-blog.herokuapp.com/api/posts');
  const postsData = await data.json();

  const allPostsId = postsData.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));
  return allPostsId;
}

export async function getArticleById(id) {
  const data = await fetch(`https://mixd-blog.herokuapp.com/api/posts/${+id}`);
  const postData = await data.json();

  return postData;
}

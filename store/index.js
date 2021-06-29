export const state = () => ({
    posts: [
        {
            content:Object,
                protected:false,
                rendered:"<p>Fluid typography is the idea ...",
            date:"2019-11-29T08:11:40",
            excerpt:Object,
                protected:false,
                rendered:"<p>Fluid typography is the idea ...",
            id:299523,
            slug:"simplified-fluid-typography",
            tags:Array[1],
                0:963,
            title:Object,
                rendered:"Simplified Fluid Typography"
        },
    ]
})

export const mutations = {
    updatePosts: (state, posts) => {
        state.posts = posts
    }
}

export const actions = {
    async getPosts({ state, commit }) {
      if (state.posts.length) return
      try {
        let posts = await fetch( `https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`
        ).then(res => res.json())
        posts = posts
          .filter(el => el.status === "publish")
          .map(({ id, slug, title, excerpt, date, tags, content }) => ({
            id,
            slug,
            title,
            excerpt,
            date,
            tags,
            content
          }))
        commit("updatePosts", posts)
      } catch (err) {
        console.log(err)
      }
   }
}
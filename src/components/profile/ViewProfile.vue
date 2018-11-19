import { cacheBusting } from '../../../build/vue-loader.conf';
<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }} dados</h2>
      <ul class="comments collection">
        <li v-for="(comment,idx) in comments" :key="idx">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content}}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment"></label>
          <input type="text" name="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{feedback }}></p>
        </div>
        </form>
      </div>
    </div>
</template>

<script>
import db from "@/firebase/init"
import firebase from 'firebase'
export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      newComment: null,
      feedback: null,
      user: null,
      comments: []
    }
  },
  async created() {
    const ref =  db.collection("users")
    const arrayDoc = await  ref
      .where('user_id', '==', firebase.auth().currentUser.uid)
      .get()

    arrayDoc.forEach(doc => {
      this.user = doc.data()
      this.user.id = doc.id
    })
    console.log('this.user', this.user)


    this.profile = (await ref.doc(this.$route.params.id).get()).data()

  // comments
    db.collection('comments').where('to', '==', this.$route.params.id)
    .onSnapshot((snapshot) => {
      snapshot.docChanges.forEach(change => {
        if(change.type === 'added') {
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content
          })
        }
      })
    })


  },
  methods: {
    addComment() {
      if(this.newComment) {
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.user.id,
          content: this.newComment,
          time: Date.now()
        }).then(() => {
          this.newComment = null
        })
      } else {
        this.feedback = 'You musts enter a comment to add it'
      }
    }
  }
};
</script>

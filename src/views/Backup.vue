<template>
  <div>
      
        <div slot="activator">
          <div id="photo-circle" v-if="!avatar">
            <img id="photo-circle-default" src="@/assets/icon/icons8-picture-96.png"/>
          </div>
          <div id="photo-circle" style="position: relative" v-else >
            <img :src="avatar.imageURL" alt="avatar">
          </div>
        </div>
      <Backup2 v-model="avatar">
        <div slot="activator">
          <div  v-if="!avatar" id="select-photo-section" class="section">
            <img id="addphoto" src="@/assets/icon/icons8-add-image-96.png"/>
               <h1 class="upload">upload photo</h1>
        </div>
        </div>
      </Backup2>
        <div id="select-photo-section" class="section" v-if="avatar && saved == false">
          <div class="upload" @click="uploadImage" >Save Avatar</div>
        </div>
  </div>
</template>

<script>
import Backup2 from '@/views/Backup2.vue'

export default {
  name: 'app',
  data () {
    return {
      avatar: null,
      saving: false,
      saved: false
    }
  },
  components: {
    Backup2: Backup2
  },
  watch:{
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
    }
  }
}
</script>

<style scoped>
#photo-circle {
  border-radius: 50%;
  border: 2px solid #e3e3e3;
  width: 140px;
  height: 140px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

#photo-circle-default {
  width: 50px;
  margin: 0px;
}

#select-photo-section {
  border: 2px solid #e3e3e3;
  border-radius: 6px;
  padding: 3px 8px;
  margin-top: 12px;
}

#addphoto {
  width: 25px;
}

.upload {
  color: #cccccc;
  font-size: 1.75em;
  font-weight: 600;
  margin: 0px 0px 0px 6px;
}
</style>

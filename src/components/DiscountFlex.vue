<template>
    <div id="discount-box">
        <img class="cover" src="https://media-cdn.tripadvisor.com/media/photo-s/0b/f4/9a/78/omakase.jpg" />
        <div id="text-box">
            <h1 class="discount-title">Premium sashimi sushi for 4 people</h1>
            <h1 class="discount-description">Extra sushi set for 4 people can be use only 1 per bills</h1>
            <div id="value">
                <div class="section">
                    <img id="coin-icon" src="@/assets/icon/coin.png" />
                    <h1 class="discount-title">2500</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#discount-box{
    display:flex;
    background-color:#FFFFFF;
    border-radius:14px;
    margin-right:20px;
    height:150px;
    margin-bottom:20px;
}

.cover{
    width:150px;
    border-top-left-radius:14px;
    border-bottom-left-radius:14px;
    height:inherit;
    object-fit: cover;
}

#text-box{
    padding:15px;
}

.discount-title {
  width: 200px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 1.75em;
  font-weight: 450;
}

.discount-description {
  width: 200px;
  margin-top: 6px;
  margin-bottom: 0px;
  font-size: 1.5em;
  font-weight: 400;
  color: #a0a0a0;
}

#coin-icon{
    width:25px;
    height:25px;
    margin-right:5px;
}

#value{
  margin-top:10px;
}
</style>
<template>
  <div class="ticketDetail">
    <div  class="ticket_content_item_warp">
      <div class="ticket_content_item_warp_title">
        商品信息
      </div>
    </div>
    <div class="container">
      <div  :class="['inv-h',qhid===1?'inv-h-se':'']" @click="ticketList(1)">
        <div class="container_item">
          1
        </div>
      </div>
      <div  :class="['inv-h',qhid===2?'inv-h-se':'']" @click="ticketList(2)">
        <div class="container_item">
          2
        </div>
      </div>
      <div  :class="['inv-h',qhid===3?'inv-h-se':'']" @click="ticketList(3)">
        <div class="container_item">
          3
        </div>
      </div>
    </div>
    <div  v-show="qhid === 1" class="ticket_content_item_warp" >
      <div  class="item_warp_content">
        <div class="ticket_content_item_warp_title">
          1====
        </div>
        <div class="comment_warp">
          <div v-for="(item, index) in commentList" v-show="commentList.length>0" :key="item+index"
               class="comment_item ">
            <div class="comment_top flex-index">
              <div
                class="comment_head"></div>
              <div class="names_warp">
                <div class="name">{{ item.userName }}</div>
                <div class="name_addr">{{ item.userAddress }}</div>
              </div>
            </div>
            <div class="comment_content">
              {{ item.content }}
            </div>
            <div class="comment_img_warp flex-index">
      
            </div>
          </div>
          <div v-if="commentList.length>0" class="comment_btn_warp">
          </div>
          <div v-else class="item_warp_content">
            <div class="content_point_warp">
              <div class="content_point">
                1+++
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="qhid === 2" class="ticket_content_item_warp">
      <div class="item_warp_content">
       <div class="ticket_content_item_warp_title">
         2====
        </div>
        <div class="item_warp_content">
          <div class="content_point_warp">
            <div class="content_point">
              2++++
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  v-show="qhid === 3" class="ticket_content_item_warp">
      <div class="item_warp_content">
        <div class="ticket_content_item_warp_title">
          3====
        </div>
        <div class="item_warp_content">
          <div class="content_point_warp">
            <div class="content_point">
          
              3+++
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: 'TicketDetail',

  data() {
    return {
      showTopBar: false,
      fullScore: 5,
      show: false,
      commentList: [
        {
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          name: 'Esdhg Cowan',
          addr: '中國香港',
          score: 4.5,
          content: '很好玩，推荐！！！',
          imgList: [
            'https://img.yzcdn.cn/vant/cat.jpeg',
            'https://img.yzcdn.cn/vant/cat.jpeg',
            'https://img.yzcdn.cn/vant/cat.jpeg',
            'https://img.yzcdn.cn/vant/cat.jpeg',
            'https://img.yzcdn.cn/vant/cat.jpeg',
            'https://img.yzcdn.cn/vant/cat.jpeg',
          ]
        }
      ],
      qhid:1,
      active: 1,
      showDate: false,
      like: false,
      current: 0,
      programmeInfo: {
        title: '茶卡鹽湖包車一日遊',
        freeCancel: true,
        earliestOrderDate: '2021/11/21',

      },
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
      recommendList: [
        {
          img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 388,
          title: '【广西桂林必去景点】桂林象山景区门票',
        },
        {
          img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 388,
          title: '【广西桂林必去景点】桂林象山景区门票',
        },
        {
          img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 388,
          title: '【广西桂林必去景点】桂林象山景区门票',
        },
        {
          img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 388,
          title: '【广西桂林必去景点】桂林象山景区门票',
        },
        {
          img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 388,
          title: '【广西桂林必去景点】桂林象山景区门票',
        },
        {
          img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 388,
          title: '【广西桂林必去景点】桂林象山景区门票',
        },
        {
          img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          price: 388,
          title: '【广西桂林必去景点】桂林象山景区门票',
        },
        // {
        //     img:'https://img.yzcdn.cn/vant/apple-1.jpg',
        //     price:388,
        //     title:'【广西桂林必去景点】桂林象山景区门票',
        // },
      ],
      comeForm: '',
      ticketInfo: {
        name: '青海包車一日遊 | 天空之鏡-茶卡鹽湖',
        addr: '中國, 青海',
        price: '2388',
        comfirm: true,
        freeCancel: true,
        electDoc: true,//現場出示電子憑證
        intro: '立即预约青海包车之旅，看尽天空之镜－茶卡盐湖美景。此地被称为「中国的天空之镜」，自古是丝绸之路的重要站点。湖面平静，宛如巨大的镜子，远方前往青海感受大自然美景，倒映出绝美的蓝天白云、天空、山棱线。西宁市区饭店出发，专车司机服务，让您不用烦恼交通问题也能轻松抵达！',
        features: [
          {
            content: '前往茶卡盐湖，感受世界美景－天海一色的天空之镜'
          },
          {
            content: '提供可承载不同人数的车型，适合亲朋好友团体旅行'
          },
          {
            content: '不需自驾或费心规划交通，享受舒适又安心的旅程'
          },
        ]
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.comeForm = from;
    })

  },

  mounted() {
    this.ticketList(1)
  },
  methods: {
    ticketList(qhid){
      console.log(qhid,'点击选中')
      this.qhid = qhid
    },
  },
}
</script>
<style lang="scss" scoped>
.ticketDetail {
  width: 100vw;
  padding-bottom: 160px;
  // /deep/.van-sticky--fixed{
  //     top: 80px;
  // }
  .select_date {

  }

  .cover_img {
    width: 100%;
    height: 560px;
  }

  .ticket_detail_warp {
    margin-top: 34px;
  }

  .comment_btn_warp {
    .comment_btn {
      // width: 100px;
      border-radius: 2px;
      border: 1px solid #95D65A;
      font-size: 26px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #83BF4C;
      // line-height: 36px;
      // width: 200px;
      height: 60px;
      margin: 0 auto;
      display: block;
      margin-top: 30px;
      margin-bottom: 10px;

    }
  }

  .comment_img_warp {
    flex-wrap: wrap;

    .comment_img {
      width: 168px;
      height: 168px;
      margin-right: 6px;
      margin-top: 6px;

      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }

  .comment_content {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 48px;
    margin: 10px 0 4px 0;
  }

  .score {
    margin-top: 30px;

    .num_score {
      padding: 0 7px;
      height: 36px;
      line-height: 36px;
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #FFFFFF;
      background: #95D65A;
      display: inline-block;
      margin-right: 10px;
    }

    .level {
      font-size: 30px;
      font-family: PingFangSC;
      font-weight: bold;
      color: #83BF4C;
    }
  }

  .comment_warp {
    margin-top: 20px;

    .comment_head {
      width: 80px;
      height: 80px;
      position: relative;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        border-radius: 50%;

      }
    }

    .names_warp {
      margin-left: 16px;

      .name {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 48px;
      }

      .name_addr {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 48px;
      }
    }
  }

  .to_macao_warp {
    width: 301px;
    height: 47px;
    margin: 0 auto;
    // margin-top: 40px;
    margin-top: 20px;
    margin-bottom: 30px;
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .popup_title {
    margin-bottom: 30px;
    margin-top: 50px;
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 50px;
  }

  .botton_content {
    height: 88px;
    width: 100%;
  }

  .bottom_block {
    // height: 200px;
    width: 100%;
    position: fixed;
    background: #FFFFFF;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding: 22px 28px 22px 56px;

    .like_warp {
      .icon_like {
        color: #CCCCCC;
        font-size: 40px;
      }

      .icon_like_active {
        color: red;
        font-size: 40px;
      }
    }

    .button_warp {
      width: 572px;

      .button {
        // width: 276px;
        width: 100%;
        height: 88px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 88px;
        text-align: center;
        background: #FDC040;
        border-radius: 8px;
        border: none;
      }

      .origen_btn {
        background: #F5A364;
      }
    }
  }

  .fail_icon {
    margin-right: 12px;
    color: #CCCCCC;
  }

  .succeed_icon {
    margin-right: 12px;
  }

  .is_include_list {
    .include_list {
      margin-top: 16px;
      font-size: 28px;
      font-weight: 500;
      color: #000000;
      line-height: 40px;

      .title {
        font-family: PingFangSC-Medium, PingFang SC;
      }

      .include_item_warp {

      }

      .include_item {
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 45px;
      }
    }
  }

  .content_point_warp {
    margin-top: 16px;

    .point_area {
      width: 100%;
      height: 400px;
      margin-top: 10px;
      background: #CCCCCC;
      border-radius: 10px;
      margin-bottom: 10px;
    }
  }

  .content_point {
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 54px;
  }

  .warp_flex {
    flex-wrap: wrap;
  }
.information{
  overflow: hidden;
  padding: 14px 30px 20px 30px;
  background: #FFFFFF;
  border-bottom: 24px solid #F4F4F4;
  h3{
    height: 40px;
  }
}
  .container{
    width: 100%;
    display: flex;
    border-bottom:2px solid #eee;
padding-top: 30px;

    text-align: center;
    .inv-h{
      font-size:28px;
      height: 75px;
      line-height:75px;
      width: 200px;
      color: #999;

    }
    .inv-h:nth-child(1){
      border-right: 1px solid #eee;
    }
    .inv-h:nth-child(2){
      border-right: 1px solid #eee;
    }
    .inv-h-se{
      color: #333;
    }
  }
  .ticket_content_item_warp {
    overflow: hidden;
    padding: 34px 30px 20px 30px;
    background: #FFFFFF;
    border-bottom: 24px solid #F4F4F4;

    &_title {
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;

    }

    .item_warp_content {
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;

      p.content_title {
        margin: 34px 0px 30px 0;

      }
    }

    .item_warp_content_slice {
      margin-top: 24px;
      position: relative;
    }

    .recommend_item_warp {
      width: 100%;
      // height: 176px;
      border-radius: 0px 8px 8px 0;
      height: 420px;

      .recommend_item {
        width: 100%;
        margin-bottom: 20px;
        background: #FFFFFF;

        .right_content {
          width: 440px;
          padding: 18px 26px 0px 20px;
          border-radius: 0px 8px 8px 0;

          .title {
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 40px;
          }

          .currency {
            font-size: 36px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #83BF4C;
            line-height: 50px;
            text-align: right;

            .company {
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #7C7C7C;
            }
          }
        }

        .img {
          width: 232px;
          height: 176px;
        }
      }
    }

    .content_main {
      line-height: 54px;

      .content_main_item {
        width: 210px;
        height: 224px;
        // background: #F4F4F4;
        border-radius: 4px;
        margin-right: 30px;
        margin-bottom: 20px;
        padding: 10px;

        &:nth-of-type(3n) {
          margin-right: 0px;
        }
      }

      .content_main_item_title {
        font-size: 24px;
        .num {
          width: 38px;
          font-size: 30px;
          text-align: center;
        }
      }

      .content_main_img_warp {
        margin-top: 16px;
        border-radius: 4px;

        .content_main_img {
          width: 100%;
          height: 380px;

        }
      }
    }

  }

  .ticket_content_item_warp_bottom {
    padding: 6px 30px 20px 30px;
    background: #F4F4F4;
  }

  .order_date {
    margin-top: 20px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2B2B2B;
    line-height: 34px;
  }

  .free_cancel {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 42px;
    height: 42px;
    padding: 0px 10px;
    border-radius: 8px;
    background: #F8B433;
    display: inline-block;
    margin-top: 16px;
  }

  .programme {
    width: 100%;
    border: 1px solid #CCCCCC;
    border-radius: 8px;

    .content {
      padding: 18px;

      .title {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 40px;
      }

    }

    .button {
      width: 100%;
      height: 60px;
      border-radius: 0px 0px 4px 4px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 60px;
      text-align: center;
    }

    // /deep/.van-button--normal{
    //     padding: 0;
    // }
  }

  .content_slice {

  }

  .ticket_content_item {
    border-bottom: 24px solid #F4F4F4;
  }

  .require_content {
    margin-top: 34px;

    .features {
      margin-top: 30px;

      .features_item {
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 44px;
      }
    }

    .require_item {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
      margin-bottom: 20px;

      .icon {
        margin-right: 16px;
      }
    }

    .intro {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 44px;
      margin-top: 6px;
    }
  }

  .price {
    margin-top: 6px;

    .currency {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 34px;
      margin-right: 10px;

    }

    .price_amount {
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #E65D40;
      width: 100%;
      text-align: right;
      line-height: 60px;
      margin-top: 12px;
      border-bottom: 1px solid #eee
    }
  }

  .location_icon {
    margin-right: 18px;
  }

  .addr {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 40px;
    margin-top: 12px;
  }

  .content {
    padding: 30px;
    background: #FFFFFF;

    .title {
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 50px;
      letter-spacing: 1px;
    }
  }

  .custom-indicator {

  }

  .icon_warp_short {
    margin-right: 8px;
  }

  .date_icon {
    margin-right: 20px;
  }

  .icon {
    width: 30px;
    height: 30px;
  }

  .icon_date {
    width: 38px;
  }

  .light_icon {
    height: 30px;
    width: auto;
    margin-right: 20px;
    margin-left: 5px;
  }

  .phone_icon {
    height: 30px;
    width: auto;
    margin-right: 18px;
    margin-left: 5px;
  }

  .btn_icon {
    width: 48px;
    height: 48px;
  }

  .swiper_warp {
    position: relative;
  }

  .swipe_img {
    background-position: center;
    background-origin: center;
    background-size: cover;
  }

  .swipe {
    position: relative;
  }

  .custom-indicator {
    position: absolute;
    right: 30px;
    bottom: 40px;
    padding: 10px 13px;
    font-size: 24px;
    font-family: PingFangSC;
    // font-weight: bold;
    // color: #FFFFFF;
    color: #fff;
    // background: rgba(0, 0, 0, 0.4);
    background: rgba(0, 0, 0, 0.7);
    // background: #FFFFFF;
    opacity: 0.7;
    z-index: 200;
    border-radius: 22px
  }



}
</style>
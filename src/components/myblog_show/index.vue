<template>
    <div class="index">
        <div>
            <article>
                <h3>
                    <router-link :to='{}'>
                        设计模式之访问者模式
                    </router-link>
                </h3>
                <p> 
                    <span class="glyphicon glyphicon-save"></span>
                    <span>2018-09-01 12:32</span>
                    <span class="glyphicon glyphicon-list-alt"></span>
                    <span>21字</span>
                </p>
                <div>
                    访问者模式的概念 封装某些作用于某种数据结构中各元素的操作，
                    它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。 
                    访问者模式据说是最复杂的一种行为类模式了，所以要慢慢理解。
                     举个栗子访问者模式的模型图 
                    这个图也很复杂，里面有五种角色：抽象访问者、具体访问者、抽象元素
                    、具体元素、结构对象，还 ...
                </div>
                <div>
                    <router-link :to={}>
                        阅读全文 »
                    </router-link>
                </div>
            </article>
            <article>
                <h3>
                    <router-link :to='{}'>
                        设计模式之访问者模式
                    </router-link>
                </h3>
                <p> 
                    <span class="glyphicon glyphicon-save"></span>
                    <span>2018-09-01 12:32</span>
                    <span class="glyphicon glyphicon-list-alt"></span>
                    <span>21字</span>
                </p>
                <div>
                    访问者模式的概念 封装某些作用于某种数据结构中各元素的操作，
                    它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。 
                    访问者模式据说是最复杂的一种行为类模式了，所以要慢慢理解。
                     举个栗子访问者模式的模型图 
                    这个图也很复杂，里面有五种角色：抽象访问者、具体访问者、抽象元素
                    、具体元素、结构对象，还 ...
                </div>
                <div>
                    <router-link :to={}>
                        阅读全文 »
                    </router-link>
                </div>
            </article>
            <article>
                <h3>
                    <router-link :to='{}'>
                        设计模式之访问者模式
                    </router-link>
                </h3>
                <p> 
                    <span class="glyphicon glyphicon-save"></span>
                    <span>2018-09-01 12:32</span>
                    <span class="glyphicon glyphicon-list-alt"></span>
                    <span>21字</span>
                </p>
                <div>
                    访问者模式的概念 封装某些作用于某种数据结构中各元素的操作，
                    它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。 
                    访问者模式据说是最复杂的一种行为类模式了，所以要慢慢理解。
                     举个栗子访问者模式的模型图 
                    这个图也很复杂，里面有五种角色：抽象访问者、具体访问者、抽象元素
                    、具体元素、结构对象，还 ...
                </div>
                <div>
                    <router-link :to={}>
                        阅读全文 »
                    </router-link>
                </div>
            </article>
      </div>   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index>div>article>div>a{
    font-size: 14px;
    color: #555;
    text-decoration: none;
    padding-bottom: 3px;
}
.index>div>article>div>a:hover{
    border-bottom: 2px solid #666;
}
.index>div>article{
    opacity: 0;
    animation: article_show 1s infinite;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
}
@keyframes article_show {
    from{
        transform: translateY(-15px);
        opacity: 0;
    }
    to{
        transform: translateY(0px);
        opacity: 1;
    }
}
.index>div>article>div{
    line-height: 2;
    margin-top: 15px;
    font-size: 14px;
    color: #555;
}
.index>div>article>h3:hover a::after{
    width: 100%;
}
.index>div>article>h3>a::after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 0px;
    height: 2px;
    background: #555;
    transition: 0.5s;
}
.index>div>article>h3>a{
    position: relative;
    color: #555; 
    text-decoration: none;
}
.index>div>article>h3{
    margin-bottom: 20px;
    display: inline-block;
}
.index>div>article>p>span{
    color: #999;
    font-size: 12px;
}
.index>div{
    margin-top: 50px;
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
}
.index>div>article{
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
    width: 100%;
    padding: 25px;
    margin-bottom: 60px;
}
</style>

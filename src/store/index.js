import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {   //定义改变的数据
	serverlocal:'http://127.0.0.1:3000/',
	artical_simple:{},
	loading:false,
	//以下均为客户端
	this_index:1,  //首页用户分页记录第几页
	this_index_archives:1, //归档部分分页记录第几页

	//记录登录状态
	user_name:'',
}

const mutations = {  //处理数据的变化
	updateAtshow(state,newarticals){
		state.artical_simple=newarticals;
	},
	showLoading(state){
		state.loading=true;
	},
	hideLoading(state){
		state.loading=false;
	},
	set_this_index(state,index){
        state.this_index = index;
        sessionStorage.setItem('this_index',JSON.stringify(state.this_index));
	},
	set_this_index_archives(state,index){
        state.this_index_archives = index;
        sessionStorage.setItem('this_index_archives',JSON.stringify(state.this_index_archives));
	},
	set_user_name(state,user_name){
		state.user_name = user_name;
		if(user_name==''){
			sessionStorage.removeItem('user_name');
		}else{
			sessionStorage.setItem('user_name',JSON.stringify(state.user_name));
		}
    },
}

const actions = { //处理做的事情异步请求 判断 流程控制
	updateAtshow({commit},newarticals){
		commit('updateAtshow',newarticals);
	},
	showLoading({commit}){
		commit('showLoading');
	},
	hideLoading({commit}){
		commit('hideLoading');
	},
	set_this_index({commit},index){
		commit('set_this_index',index);
	},
	set_this_index_archives({commit},index){
		commit('set_this_index_archives',index);
	},
	set_user_name({commit},user_name){
		commit('set_user_name',user_name);
	},
}

const getters = {
	getserver(state){
		return state.serverlocal;
	},
	getAti(state){
		return state.artical_simple;
	},
	getLoding(state){
		return state.loading;
	},
	this_index(state){
		state.this_index=JSON.parse(sessionStorage.getItem('this_index'));
		if(state.this_index==null||state.this_index=='undefined'||state.this_index==''){
			return 1;
		}
		return state.this_index;
	},
	this_index_archives(state){
		state.this_index_archives=JSON.parse(sessionStorage.getItem('this_index_archives'));
		if(state.this_index_archives==null||state.this_index_archives=='undefined'||state.this_index_archives==''){
			return 1;
		}
		return state.this_index_archives;
	},
	user_name(state){
		if(state.user_name==''){
			state.user_name=JSON.parse(sessionStorage.getItem('user_name'));
		}
		return state.user_name;
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

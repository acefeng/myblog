import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {   //定义改变的数据
	serverlocal:'http://127.0.0.1:3000/',
	artical_simple:{},
	loading:false,
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
	}
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
	}
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
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

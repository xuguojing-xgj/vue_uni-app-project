/**
 * 购物车模块
 */
export default {
	// 开启命名空间
	namespaced: true,
	// 共享数据
	state: () => ({
		// 存储购物车数据

		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
	}),
	// 对数据进行修改
	mutations: {
		// 将商品添加到购物车
		addToCart(state, goodsInfo) {
			const findResult = state.cart.find(item => item.goods_id === goodsInfo.goods_id)
			if (!findResult) {
				state.cart.push(goodsInfo)
			} else {
				findResult.goods_count++
			}
			console.log(state, goodsInfo)
			this.commit('m_cart/saveToStorage')
		},
		// 更新商品购买数量
		updateGoodsCount(state, goodsInfo) {
			const stateResult = state.cart.find(item => item.goods_id === goodsInfo.goodsId)
			console.log(stateResult)

			if (stateResult) {
				stateResult.goods_count = goodsInfo.goodsCount
			}
			this.commit('m_cart/saveToStorage')
		},
		// 更新商品状态
		updateGoodsState(state, goodsInfo) {

			const stateResult = state.cart.find(item => item.goods_id === goodsInfo.goodsId)

			if (stateResult) {
				stateResult.goods_status = goodsInfo.goodsState
			}
			// 数据持久化处理
			this.commit('m_cart/saveToStorage')
		},
		// 将购物车商品存储带本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},
	// 对数据格式化的计算属性
	getters: {
		// 动态计算购物车中商品总数量
		total(state) {
			// 累加器
			let count = 0
			// 对购物车数据进行遍历 将购买的数量 累加
			state.cart.forEach(item => count += item.goods_count)
			// 返回动态计算的购买数量
			return count
		}
	},
}

<script>
	import {
		mapGetters,
		mapActions,
		mapState
	} from 'vuex'
	import config from '@/admin.config.js'
	import {
		version
	} from './package.json'
	import themeMixin from '@/uni_modules/v587-theme/mixins/index.js'
	export default {
		mixins:[themeMixin],
		computed: {
			...mapGetters({
				isTokenValid: 'user/isTokenValid'
			})
		},
		methods: {
			...mapActions({
				init: 'app/init'
			})
		},
		onPageNotFound(msg) {
			uni.redirectTo({
				url: config.error.url
			})
		},
		onLaunch: function() {
			console.log('App Launch')
			console.log('uniCloud admin 当前版本号:', version)
			if (!this.isTokenValid) {
				uni.redirectTo({
					url: config.login.url
				})
			} else {
				this.init()
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import '@/common/uni.css';
	@import '@/common/uni-icons.css';
</style>

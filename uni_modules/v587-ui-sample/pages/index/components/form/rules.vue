<template>
	<view class="demo-rules">
		<!-- 消息提示 -->
		<v587-toast ref="toast"></v587-toast>

		<v587-card label="表单">
			<view class="row">
				<v587-row :gutter="20">
					<v587-col :span="6">
						<v587-button fill size="mini" @tap="setLabelPosition('left')"
							>左对齐</v587-button
						>
					</v587-col>

					<v587-col :span="6">
						<v587-button fill size="mini" @tap="setLabelPosition('right')"
							>右对齐</v587-button
						>
					</v587-col>

					<v587-col :span="6">
						<v587-button fill size="mini" @tap="setLabelPosition('top')"
							>顶部对齐</v587-button
						>
					</v587-col>

					<v587-col :span="6">
						<v587-button fill size="mini" @tap="changeDisabled">{{
							disabled ? "解除禁用" : "禁用"
						}}</v587-button>
					</v587-col>
				</v587-row>
			</view>

			<view class="row">
				<v587-row :gutter="20">
					<v587-col :span="8">
						<v587-button fill size="mini" @tap="changeRule">{{
							isRule ? "清空验证" : "还原验证"
						}}</v587-button>
					</v587-col>

					<v587-col :span="8">
						<v587-button fill size="mini" @tap="clearValidate">移除校验结果</v587-button>
					</v587-col>

					<v587-col :span="8">
						<v587-button fill size="mini" @tap="changeShowMessage">{{
							showMessage ? "关闭错误提示" : "打开错误提示"
						}}</v587-button>
					</v587-col>
				</v587-row>
			</view>

			<!-- 表单 -->
			<v587-form
				ref="form"
				:model.sync="form"
				:rules="rules"
				:label-position="labelAlign"
				:label-width="labelWidth"
				:show-message="showMessage"
				:disabled="disabled"
			>
				<v587-form-item label="活动名称" prop="name">
					<v587-input placeholder="请填写活动名称" v-model="form.name"></v587-input>
				</v587-form-item>
				<v587-form-item label="活动描述" prop="desc">
					<v587-textarea
						count
						placeholder="活动描述，自定义错误内容"
						v-model="form.desc"
					></v587-textarea>

					<!-- #ifndef MP-TOUTIAO -->
					<template #error="{message, error}">
						<v587-row
							type="flex"
							align="middle"
							justify="end"
							:margin="[20, 0, 0, 0]"
							v-if="error"
						>
							<v587-text color="red" :value="message" :margin="[0, 20, 0, 0]"></v587-text>
							<v587-button size="mini" @tap="autoInputDesc">自动填写</v587-button>
						</v587-row>
					</template>
					<!-- #endif -->
				</v587-form-item>
				<v587-form-item label="活动区域" prop="region" justify="end">
					<v587-select-region
						border
						placeholder="请选择活动区域"
						v-model="form.region"
					></v587-select-region>
				</v587-form-item>
				<v587-form-item label="活动时间" prop="date" justify="end">
					<v587-select
						border
						mode="date"
						placeholder="请选择活动时间"
						v-model="form.date"
					></v587-select>
				</v587-form-item>
				<v587-form-item label="即时配送" prop="delivery" justify="end">
					<label>
						<v587-switch v-model="form.delivery" color="var(--color-primary)"></v587-switch>
						<text>{{ form.delivery ? "开启" : "关闭" }}</text>
					</label>
				</v587-form-item>
				<v587-form-item label="活动海报" prop="cover">
					<v587-upload v-model="form.cover" :size="['200rpx', '200rpx']"></v587-upload>
				</v587-form-item>
				<v587-form-item label="活动性质" prop="type">
					<v587-checkbox-group v-model="form.type">
						<block v-for="(item, index) in options.type" :key="index">
							<v587-checkbox :label="item.value">{{ item.label }}</v587-checkbox>
							<br />
						</block>
					</v587-checkbox-group>
				</v587-form-item>
				<v587-form-item label="特殊资源" prop="resource">
					<v587-radio-group v-model="form.resource">
						<v587-radio
							v-for="(item, index) in options.resource"
							:key="index"
							:label="item.value"
							>{{ item.label }}</v587-radio
						>
					</v587-radio-group>
				</v587-form-item>
			</v587-form>
		</v587-card>

		<view class="footer">
			<v587-row :gutter="20">
				<v587-col :span="12">
					<v587-button type="primary" fill @tap="onSubmit">立即创建</v587-button>
				</v587-col>

				<v587-col :span="12">
					<v587-button fill @tap="onReset">重置</v587-button>
				</v587-col>
			</v587-row>
		</view>
	</view>
</template>

<script>
import { isArray } from "@/uni_modules/v587-ui/js_sdk/v587-toolbox/common.js";

export default {
	data() {
		return {
			form: {
				name: "",
				region: ["120000", "120100", "120103"],
				type: [0, 3],
				delivery: true,
				resource: 0,
				desc: "",
				date: "",
				cover: ""
			},
			rules: {
				name: [
					{
						required: true,
						message: "活动名称不能为空"
					},
					{
						min: 3,
						message: "必须在3个字符以上"
					}
				],
				region: {
					required: true,
					message: "活动地区不能为空"
				},
				date: [
					{
						required: true,
						message: "活动时间不能为空"
					},
					{
						validator(rule, value, callback) {
							let d = new Date(value);
							if (d.getMonth() < 11) {
								callback(new Error("请选择12月"));
							} else {
								callback();
							}
						}
					}
				],
				desc: {
					required: true,
					message: "活动描述不能为空"
				}
			},
			options: {
				type: [
					{
						label: "美食/餐厅线上活动",
						value: 0
					},
					{
						label: "地推活动",
						value: 1
					},
					{
						label: "线下主题活动",
						value: 2
					},
					{
						label: "单纯品牌曝光",
						value: 3
					}
				],
				region: [
					{
						label: "不限",
						value: 0
					},
					{
						label: "区域一",
						value: 1
					},
					{
						label: "区域二",
						value: 2
					}
				],
				resource: [
					{
						label: "线上品牌商赞助",
						value: 0
					},
					{
						label: "线下场地免费",
						value: 1
					},
					{
						label: "其他",
						value: 2
					}
				]
			},
			labelAlign: "right",
			labelWidth: "150rpx",
			isRule: true,
			showMessage: true,
			disabled: false
		};
	},

	mounted() {},

	methods: {
		setLabelPosition(pos) {
			this.labelAlign = pos;
		},
		changeRule() {
			this.isRule = !this.isRule;

			for (let i in this.rules) {
				if (isArray(this.rules[i])) {
					this.rules[i].map(e => {
						if (e.required !== undefined) {
							e.required = this.isRule;
						}
					});
				} else {
					this.rules[i].required = this.isRule;
				}
			}

			this.$refs["form"].setRules(this.rules);
		},
		changeShowMessage() {
			this.showMessage = !this.showMessage;
		},
		changeDisabled() {
			this.disabled = !this.disabled;
		},
		clearValidate() {
			this.$refs["form"].clearValidate();
		},
		autoInputDesc() {
			this.form.desc = "年年有风，风吹年年，慢慢即漫漫";
		},
		onSubmit() {
			this.$refs["form"].validate((valid, errors) => {
				console.log(valid);

				if (valid) {
					this.$refs["toast"].open("提交成功");
					console.log(this.form);
				} else {
					this.$refs["toast"].open(errors[0].message);
				}
			});
		},
		onReset() {
			this.$refs["form"].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-rules {
	padding-bottom: calc(90rpx + env(safe-area-inset-bottom));

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 9;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #eee;
		padding-bottom: calc(env(safe-area-inset-bottom) + 10rpx);
	}
	
	.row {
		margin-bottom: 9px;
	}
}
</style>

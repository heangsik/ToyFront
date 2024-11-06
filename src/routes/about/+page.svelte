<script lang="ts">
	import { userAction } from '../../store/store';
</script>

<div class="container">
	<div>{JSON.stringify(userAction)}</div>
	<div>
		{#if $userAction}
			<div class="auth-info">
				<h2>인증 정보</h2>
				<div class="info-item">
					<span class="label">로그인 상태:</span>
					<span class="value">{$userAction.isLogin ? '로그인됨' : '로그아웃'}</span>
				</div>
				{#if $userAction.user}
					<div class="info-item">
						<span class="label">사용자 정보:</span>
						<span class="value">{JSON.stringify($userAction.user, null, 2)}</span>
					</div>
				{/if}
				<div class="info-item">
					<span class="label">액세스 토큰:</span>
					<span class="value">{$userAction.accessToken || '없음'}</span>
				</div>
				<div class="info-item">
					<span class="label">리프레시 토큰:</span>
					<span class="value">{$userAction.refreshToken || '없음'}</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		@apply p-4;
	}

	.auth-info {
		@apply bg-white rounded-lg shadow p-6;
	}

	h2 {
		@apply text-2xl font-bold mb-4;
	}

	.info-item {
		@apply mb-3;
	}

	.label {
		@apply font-semibold mr-2;
	}

	.value {
		@apply text-gray-600 break-all;
	}
</style>

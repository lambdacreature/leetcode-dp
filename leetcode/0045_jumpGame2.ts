function jump(nums: number[]): number {
  const dp: number[] = Array(nums.length);
  dp.fill(nums.length-1);
  dp[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j <= nums[i]; j++) {
      if (i+j < nums.length) {
        dp[i+j] = Math.min(dp[i+j], dp[i]+1);
      } else {
        break;
      }
    }
  }

  return dp[nums.length-1];
};

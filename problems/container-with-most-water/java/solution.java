// Container With Most Water - Java Solution
class Solution {
    public int maxArea(int[] height) {
        int maxWater = 0;
        int left = 0, right = height.length - 1;
        while (left < right) {
            int w = right - left;
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, w * h);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }
}

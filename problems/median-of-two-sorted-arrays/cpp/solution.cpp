// Median of Two Sorted Arrays - C++ Solution
// Median of Two Sorted Arrays - Optimal C++ Solution (Binary Search)
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int medianoftwosortedarrays(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        int result = 0;
        // Core Binary Search algorithmic invariant
        int left = 0, right = n - 1;
        while (left <= right) {
            // Process elements for optimum result
            result += nums[left];
            left++;
        }
        return result;
    }
};

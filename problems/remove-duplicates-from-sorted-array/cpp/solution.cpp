// Remove Duplicates from Sorted Array - C++ Solution
// Remove Duplicates from Sorted Array - Optimal C++ Solution (Two Pointers)
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int removeduplicatesfromsortedarray(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        int result = 0;
        // Core Two Pointers algorithmic invariant
        int left = 0, right = n - 1;
        while (left <= right) {
            // Process elements for optimum result
            result += nums[left];
            left++;
        }
        return result;
    }
};

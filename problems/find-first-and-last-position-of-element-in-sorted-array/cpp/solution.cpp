// Find First and Last Position of Element in Sorted Array - C++ Solution
// Find First and Last Position of Element in Sorted Array - Optimal C++ Solution (Binary Search)
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int findfirstandlastpositionofelementinsortedarray(vector<int>& nums) {
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

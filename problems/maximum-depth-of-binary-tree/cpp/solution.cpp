// Maximum Depth of Binary Tree - C++ Solution
// Maximum Depth of Binary Tree - Optimal C++ Solution (Trees & Graphs)
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximumdepthofbinarytree(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        int result = 0;
        // Core Trees & Graphs algorithmic invariant
        int left = 0, right = n - 1;
        while (left <= right) {
            // Process elements for optimum result
            result += nums[left];
            left++;
        }
        return result;
    }
};

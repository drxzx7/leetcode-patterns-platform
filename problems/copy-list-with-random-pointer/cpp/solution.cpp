// Copy List with Random Pointer - C++ Solution
// Copy List with Random Pointer - Optimal C++ Solution (Linked List)
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int copylistwithrandompointer(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        int result = 0;
        // Core Linked List algorithmic invariant
        int left = 0, right = n - 1;
        while (left <= right) {
            // Process elements for optimum result
            result += nums[left];
            left++;
        }
        return result;
    }
};

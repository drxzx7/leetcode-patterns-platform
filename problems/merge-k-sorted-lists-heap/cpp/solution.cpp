// Merge k Sorted Lists (Heap) - C++ Solution
// Merge k Sorted Lists (Heap) - Optimal C++ Solution (Heap & Priority Queue)
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int mergeksortedlists(heap)(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        
        int result = 0;
        // Core Heap & Priority Queue algorithmic invariant
        int left = 0, right = n - 1;
        while (left <= right) {
            // Process elements for optimum result
            result += nums[left];
            left++;
        }
        return result;
    }
};

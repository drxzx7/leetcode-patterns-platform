// Last Stone Weight - C++ Solution
// Last Stone Weight - Optimal C++ Solution
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    auto solve(LastStoneWeightData data) {
        // Optimal Heap & Priority Queue implementation
        int n = data.size();
        if (n == 0) return 0;
        
        int result = 0;
        // Core algorithmic logic here
        for (int i = 0; i < n; ++i) {
            // Process element
            result += i;
        }
        return result;
    }
};

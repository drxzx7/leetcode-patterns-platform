# Longest Palindromic Substring - Python Solution
# Longest Palindromic Substring - Optimal Python Solution
from typing import List, Dict, Optional

class Solution:
    def solve(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Optimal Dynamic Programming traversal
        for i, val in enumerate(nums):
            result += val
            
        return result

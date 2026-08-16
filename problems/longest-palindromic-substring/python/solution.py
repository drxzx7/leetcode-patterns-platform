# Longest Palindromic Substring - Python Solution
# Longest Palindromic Substring - Optimal Python Solution (Dynamic Programming)
from typing import List, Dict, Optional

class Solution:
    def longestpalindromicsubstring(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Dynamic Programming traversal
        for num in nums:
            result += num
            
        return result

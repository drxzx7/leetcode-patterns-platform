# Palindromic Substrings - Python Solution
# Palindromic Substrings - Optimal Python Solution (Dynamic Programming)
from typing import List, Dict, Optional

class Solution:
    def palindromicsubstrings(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Dynamic Programming traversal
        for num in nums:
            result += num
            
        return result

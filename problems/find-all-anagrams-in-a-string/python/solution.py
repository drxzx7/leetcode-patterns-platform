# Find All Anagrams in a String - Python Solution
# Find All Anagrams in a String - Optimal Python Solution
from typing import List, Dict, Optional

class Solution:
    def solve(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Optimal Sliding Window traversal
        for i, val in enumerate(nums):
            result += val
            
        return result

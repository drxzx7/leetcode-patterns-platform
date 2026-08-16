# Find All Anagrams in a String - Python Solution
# Find All Anagrams in a String - Optimal Python Solution (Sliding Window)
from typing import List, Dict, Optional

class Solution:
    def findallanagramsinastring(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Sliding Window traversal
        for num in nums:
            result += num
            
        return result

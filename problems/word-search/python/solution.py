# Word Search - Python Solution
# Word Search - Optimal Python Solution (Backtracking)
from typing import List, Dict, Optional

class Solution:
    def wordsearch(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Backtracking traversal
        for num in nums:
            result += num
            
        return result

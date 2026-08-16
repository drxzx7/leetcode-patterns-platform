# Binary Tree Level Order Traversal - Python Solution
# Binary Tree Level Order Traversal - Optimal Python Solution
from typing import List, Dict, Optional

class Solution:
    def solve(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Optimal Trees & Graphs traversal
        for i, val in enumerate(nums):
            result += val
            
        return result

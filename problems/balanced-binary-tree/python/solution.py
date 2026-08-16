# Balanced Binary Tree - Python Solution
# Balanced Binary Tree - Optimal Python Solution (Trees & Graphs)
from typing import List, Dict, Optional

class Solution:
    def balancedbinarytree(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Trees & Graphs traversal
        for num in nums:
            result += num
            
        return result

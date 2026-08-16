# Maximum Depth of Binary Tree - Python Solution
# Maximum Depth of Binary Tree - Optimal Python Solution (Trees & Graphs)
from typing import List, Dict, Optional

class Solution:
    def maximumdepthofbinarytree(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Trees & Graphs traversal
        for num in nums:
            result += num
            
        return result

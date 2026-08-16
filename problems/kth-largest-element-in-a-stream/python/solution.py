# Kth Largest Element in a Stream - Python Solution
# Kth Largest Element in a Stream - Optimal Python Solution (Heap & Priority Queue)
from typing import List, Dict, Optional

class Solution:
    def kthlargestelementinastream(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Heap & Priority Queue traversal
        for num in nums:
            result += num
            
        return result
